import * as React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  CircularProgress,
  FormHelperText,
  Typography,
} from "@material-ui/core";

import { useParticipantQuery } from "../../generated/graphql";

export default function ListTable() {
  const router = useRouter();
  const { data, loading } = useParticipantQuery({
    variables: {
      code: router.query.code as string,
    },
    skip: !router.query.code,
  });

  if (loading || !data) {
    return <CircularProgress />;
  }

  const participant = data.participant;
  console.log(participant);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PersonalInfo participant={participant} />
      <EmploymentInfo participant={participant} />
      <AcademicInfo participant={participant} />
      <JobInfo participant={participant} />
      <SchoolInfo participant={participant} />
      <ScheduleInfo participant={participant} />
      <PreCongressCourse participant={participant} />
      <OnlineSeminar participant={participant} />
      <PaymentCurrency participant={participant} />
    </div>
  );
}

function PersonalInfo({ participant }) {
  return (
    <Block>
      <Field title="Código:" value={participant.code} />
      <Field title="Nome:" value={participant.name} />
      <Field title="Telefone:" value={participant.whatsapp} />
      <Field
        title="Comprovativo de pagamento:"
        value={
          participant.paymentProofUrl && (
            <NextLink href={participant.paymentProofUrl}>[Visualizar]</NextLink>
          )
        }
      />
    </Block>
  );
}

const professionalStatus = [
  { value: 1, text: "Estudante" },
  { value: 2, text: "Trabalhador" },
];

function EmploymentInfo({ participant }) {
  return (
    <Block>
      <Field
        title="Situação profissional"
        value={getText(professionalStatus, participant.professionalStatus)}
      />
    </Block>
  );
}

const academicDegreeList = [
  { value: 1, text: "Básico" },
  { value: 2, text: "Médio" },
  { value: 3, text: "Licenciado" },
  { value: 4, text: "Pós Graduação" },
  { value: 5, text: "Mestre" },
  { value: 6, text: "PhD" },
];

function AcademicInfo({ participant }) {
  return (
    <Block>
      <Field
        title="Área de formação académica"
        value={participant.academicField}
      />
      <Field
        title="Maior nível de formação"
        value={getText(academicDegreeList, participant.academicDegree)}
      />
    </Block>
  );
}

function JobInfo({ participant }) {
  return (
    <Block>
      <Field title="Profissão" value={participant.profession} />
      <Field title="Especialidade" value={participant.speciality} />
      <Field title="Local de trabalho" value={participant.workLocation} />
      <Field title="Cargo que ocupa" value={participant.jobTitle} />
    </Block>
  );
}

function SchoolInfo({ participant }) {
  return (
    <Block>
      <Field
        title="Nome da escola / Universidade"
        value={participant.university}
      />
      <Field title="Ano / Classe" value={participant.grade} />
    </Block>
  );
}

const datesList = [
  { value: 1, text: "1º Dia (25 de Novembro)" },
  { value: 2, text: "2º Dia (26 de Novembro)" },
];

const audienceTypeList = [
  { value: 1, text: "Presencialmente" },
  { value: 2, text: "Remotamente" },
];

function ScheduleInfo({ participant }) {
  const dates = participant.dates.map((date) => (
    <span key={date}>{getText(datesList, date)} | </span>
  ));

  return (
    <Block>
      <Field title="Dias em que irá participar (Congresso):" value={dates} />
    </Block>
  );
}

const daysToAttendList = [
  { value: 1, text: "Apenas no 1º dia (22 de Novembro)" },
  { value: 2, text: "Apenas no 2º dia (23 de Novembro)" },
  { value: 3, text: "Nos dois dias (22 e 23 de Novembro)" },
];

const pcDayOneCourseList = [
  {
    value: 1,
    text: "Emergência e Trauma: Avaliação Primeira e Reanimação",
  },
  { value: 2, text: "Partograma - Turma 1" },
  {
    value: 3,
    text: "Administração de Medicamentos - Turma 1",
  },
  {
    value: 4,
    text: "Como Elaborar um Plano de Acção: Método 5W1H ou 5W2H",
  },
  { value: 5, text: "Tratamento de Feridas - Turma 1" },
  { value: 6, text: "Biossegurança: Risco Biológico" },
];

const pcDayTwoCourseList = [
  {
    value: 1,
    text: "Emergência e Trauma: Abordagem do Paciente em paragem Cardio-respiratória",
  },
  { value: 2, text: "Biossegurança: uso correcto dos EPIs" },
  { value: 3, text: "Desenvolvimento e Liderança" },
  {
    value: 4,
    text: "Introdução aos Indicadores de Desempenho (BSC)",
  },
  { value: 5, text: "Tratamento de Feridas - Turma 2" },
  { value: 6, text: "Partograma - Turma 2" },
];

function PreCongressCourse({ participant }) {
  const day1Course = getText(pcDayOneCourseList, participant.pcDayOneCourse);
  const day2Course = getText(pcDayTwoCourseList, participant.pcDayTwoCourse);

  return (
    <Block>
      {participant.pcDaysToAttend && (
        <Field
          title="Dias em que irá participar (Pré-congresso):"
          value={getText(daysToAttendList, participant.pcDaysToAttend)}
        />
      )}
      {day1Course && <Field title="Curso para o 1º dia:" value={day1Course} />}
      {day2Course && <Field title="Curso para o 2º dia:" value={day2Course} />}
    </Block>
  );
}

const yesNoList = [
  { value: 1, text: "Sim" },
  { value: 2, text: "Não" },
];

function OnlineSeminar({ participant }) {
  return (
    <Block>
      {participant.osWillAttend && (
        <Field
          title="Seminário Online:"
          value={getText(yesNoList, participant.osWillAttend)}
        />
      )}
    </Block>
  );
}

const currencyList = [
  { value: "AKZ", text: "Kwanzas - AKZ" },
  { value: "USD", text: "Dólares Americanos - USD" },
];

function PaymentCurrency({ participant }) {
  return (
    <Block>
      {participant.paymentCurrency && (
        <Field
          title="Valor a pagar:"
          value={Intl.NumberFormat("pt-PT").format(participant.paymentTotal) + " " + participant.paymentCurrency}
        />
      )}
    </Block>
  );
}

function Block({ children }) {
  return <div>{children}</div>;
}

function Field({ title, value }) {
  return (
    <div
      style={{
        display: "flex",
        placeItems: "self-end",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
      }}
    >
      <div>{title}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
      {/* <Typography color={"textSecondary"}>{title}</Typography>
      <FormHelperText>{value}</FormHelperText> */}
    </div>
  );
}

function getText(map, value) {
  return map.filter((x) => x.value === value).map((x) => x.text)[0];
}
