import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { MockInterview } from "./schema";
import * as schema from "./schema";
import { desc, eq } from "drizzle-orm";
import { toast } from "sonner";
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle(sql, { schema });

export async function submitDataToDatabase(
  email,
  result,
  jobPosition,
  jobDesc,
  jobExp
) {
  const resp = await db
    .insert(MockInterview)
    .values({
      mockId: uuidv4(),
      jsonMockResp: result,
      jobPosition: jobPosition,
      jobDesc: jobDesc,
      jobExperience: jobExp,
      createdBy: email,
      createdAt: moment().format("DD-MM-YYYY"),
    })
    .returning({ mockId: MockInterview.mockId });
  return resp;
}

export async function deleteInterview(id) {
  try {
    const result = await db
                   .delete(MockInterview)
                   .where(eq(MockInterview.id, id));
  
    console.log(result)
    return result;
  } catch (error) {
    console.error('Error fetching interview details:', error);
    throw new Error('Failed to fetch interview details');
  }}

export async function getInterviewDetails(id) {
  try {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));
  
    console.log(result[0]);
    return result[0];
  } catch (error) {
    console.error('Error fetching interview details:', error);
    throw new Error('Failed to fetch interview details');
  }}
 

export async function getInterviewList(email) {
  try {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email))
      .orderBy(desc(MockInterview.id));
    
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching interview data:', error);
    throw new Error('Failed to fetch interview data');
  }
  
}
