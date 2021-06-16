import * as admin from "firebase-admin";
import { ApolloServer } from "@saeris/apollo-server-vercel";
import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

if (admin.apps.length === 0) {
  const credential = process.env.GCLOUD_CREDENTIALS
    ? admin.credential.cert(
        JSON.parse(
          Buffer.from(process.env.GCLOUD_CREDENTIALS, "base64").toString()
        )
      )
    : admin.credential.applicationDefault();

  admin.initializeApp({
    credential,
    databaseURL: "https://ordenfa-2021.firebaseio.com",
  });
}

const db = admin.firestore();

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    participants(take: Int, skip: Int): ParticipantListResult!
    participant(code: String!): Participant
  }

  type ParticipantListResult {
      totalCount: Int!
      items: [Participant!]!
  }

  type Participant {
    name: String
    email: String
    whatsapp: String
    startDate: String
    professionalStatus: Int
    academicField: String
    academicDegree: Int
    profession: String
    speciality: String
    workLocation: String
    jobTitle: String
    university: String
    grade: String
    dates: [Int]
    dayOneAudienceType: Int
    dayTwoAudienceType: Int
    pcWillAttend: Int
    pcDaysToAttend: Int
    pcDayOneCourse: Int
    pcDayTwoCourse: Int
    osWillAttend: Int
    paymentCurrency: String
    paymentTotal: Float
    paymentMethod: String
    whenToPay: Int
    code: String
    paymentProofUrl: String
    paymentDate: String
    subscribeDate: String
    # congressPaymentInfo: [PaymentInfo!]!
  }

  #type PaymentInfo {
  #  audienceTypeId: Int
  #  audienceTypeString: String!
  #  dateString: String
  #  priceAoa: Int
  #  priceUsd: Int
  #}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    async participants(_, args) {
      let participants = db
        .collection(process.env.PARTICIPANTS_COLLECTION_PATH)
        .offset(0); // .orderBy("paymentDate");

      const totalCount = (await participants.get()).docs.length;

      if (args.skip) {
        participants = participants.offset(args.skip);
      }

      if (args.take) {
        participants = participants.limit(args.take);
      }

      const data = await participants.get();

      return {
        totalCount,
        items: data.docs.map((x) => mapParticipant(x.data())),
      };
    },
    async participant(_, { code }) {
      let participants = db
        .collection(process.env.PARTICIPANTS_COLLECTION_PATH)
        .where("code", "==", code); // .orderBy("paymentDate");

      const data = await participants.get();

      if (data.empty) {
        return null;
      }

      return mapParticipant(data.docs[0].data());
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

export default server.createHandler();

function mapParticipant(dbParticipant) {
  const currency = dbParticipant.PaymentCurrency?.paymentCurrency?.toLowerCase();
  const paymentTotal = dbParticipant.PaymentInfo?.total?.price?.[["aoa", "akz"].includes(currency)?"aoa":"usd"];

  return {
    ...dbParticipant,
    ...(dbParticipant.PersonalInfo ?? {}),
    ...(dbParticipant.EmploymentInfo ?? {}),
    ...(dbParticipant.AcademicInfo ?? {}),
    ...(dbParticipant.JobInfo ?? {}),
    ...(dbParticipant.SchoolInfo ?? {}),
    ...(dbParticipant.ScheduleInfo ?? {}),
    ...(dbParticipant.AudienceType ?? {}),
    ...(dbParticipant.PreCongressCourse ?? {}),
    ...(dbParticipant.PreCongressCourseSelection ?? {}),
    ...(dbParticipant.OnlineSeminar ?? {}),
    ...(dbParticipant.PaymentInfo ?? {}),
    ...(dbParticipant.PaymentMethod ?? {}),
    ...(dbParticipant.PaymentCurrency ?? {}),
    ...(dbParticipant.CheckoutInfo ?? {}),
    ...(dbParticipant.PayNow ?? {}),
    ...(dbParticipant.PayAfter ?? {}),
    ...(dbParticipant.PaySuccess ?? {}),
    paymentTotal,
  };
}
