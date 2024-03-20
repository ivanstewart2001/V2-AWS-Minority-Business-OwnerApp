import { GraphQLResult, generateClient } from "aws-amplify/api";
import { getAccount as getAccountQuery } from "../../graphql/queries";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { signIn, getCurrentUser } from "@aws-amplify/auth";
import config from "../../amplifyconfiguration.json";

Amplify.configure(config);

const client = generateClient();

export default async function fetchAccount({ userId }: { userId: string }) {
  console.log("IN FETCH ACCOUNT: ", userId);

  // const currentUser = await getCurrentUser();
  // console.log(currentUser);
  // if (!currentUser) {
  //   throw new Error("No user is currently signed in");
  // }

  try {
    const res = await client.graphql({
      query: getAccountQuery,
      variables: {
        id: userId,
      },
    });

    console.log("FROM FETCH ACCOUNT", (res as GraphQLResult).data);

    return ((res as GraphQLResult).data as any).getAccount;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching account");
  }
}
