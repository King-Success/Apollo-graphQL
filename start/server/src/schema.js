const { gql } = require("apollo-server");

const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type Query {
    launches(pageSize: Int, after: String): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdatedResponse!
    cancelTrip(launchId: ID!): TripUpdatedResponse!
    login(email: String): User
  }

  type TripUpdatedResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

module.exports = typeDefs;
