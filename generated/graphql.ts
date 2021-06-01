import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Participant = {
  __typename?: 'Participant';
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  whatsapp?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  professionalStatus?: Maybe<Scalars['Int']>;
  academicField?: Maybe<Scalars['String']>;
  academicDegree?: Maybe<Scalars['Int']>;
  profession?: Maybe<Scalars['String']>;
  speciality?: Maybe<Scalars['String']>;
  workLocation?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  university?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['String']>;
  dates?: Maybe<Array<Maybe<Scalars['Int']>>>;
  dayOneAudienceType?: Maybe<Scalars['Int']>;
  dayTwoAudienceType?: Maybe<Scalars['Int']>;
  pcWillAttend?: Maybe<Scalars['Int']>;
  pcDaysToAttend?: Maybe<Scalars['Int']>;
  pcDayOneCourse?: Maybe<Scalars['Int']>;
  pcDayTwoCourse?: Maybe<Scalars['Int']>;
  osWillAttend?: Maybe<Scalars['Int']>;
  paymentCurrency?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
  whenToPay?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  paymentProofUrl?: Maybe<Scalars['String']>;
  paymentDate?: Maybe<Scalars['String']>;
  subscribeDate?: Maybe<Scalars['String']>;
};

export type ParticipantListResult = {
  __typename?: 'ParticipantListResult';
  totalCount: Scalars['Int'];
  items: Array<Participant>;
};

export type Query = {
  __typename?: 'Query';
  participants: ParticipantListResult;
};


export type QueryParticipantsArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type ParticipantsListQueryVariables = Exact<{
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type ParticipantsListQuery = (
  { __typename?: 'Query' }
  & { participants: (
    { __typename?: 'ParticipantListResult' }
    & Pick<ParticipantListResult, 'totalCount'>
    & { items: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'name' | 'email' | 'code' | 'paymentDate'>
    )> }
  ) }
);


export const ParticipantsListDocument = gql`
    query ParticipantsList($take: Int, $skip: Int) {
  participants(take: $take, skip: $skip) {
    totalCount
    items {
      name
      email
      code
      paymentDate
    }
  }
}
    `;

/**
 * __useParticipantsListQuery__
 *
 * To run a query within a React component, call `useParticipantsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantsListQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useParticipantsListQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantsListQuery, ParticipantsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParticipantsListQuery, ParticipantsListQueryVariables>(ParticipantsListDocument, options);
      }
export function useParticipantsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantsListQuery, ParticipantsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParticipantsListQuery, ParticipantsListQueryVariables>(ParticipantsListDocument, options);
        }
export type ParticipantsListQueryHookResult = ReturnType<typeof useParticipantsListQuery>;
export type ParticipantsListLazyQueryHookResult = ReturnType<typeof useParticipantsListLazyQuery>;
export type ParticipantsListQueryResult = Apollo.QueryResult<ParticipantsListQuery, ParticipantsListQueryVariables>;
export const namedOperations = {
  Query: {
    ParticipantsList: 'ParticipantsList'
  }
}