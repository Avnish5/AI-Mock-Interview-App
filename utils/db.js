import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { MockInterview } from './schema';
import * as schema from './schema'
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle(sql,{schema});


export async function submitDataToDatabase(email,result,jobPosition,jobDesc,jobExp)
{
    const resp=await db.insert(MockInterview)
                           .values({
                            mockId:uuidv4(),
                            jsonMockResp:result,
                            jobPosition:jobPosition,
                            jobDesc:jobDesc,
                            jobExperience:jobExp,
                            createdBy:email,
                            createdAt:moment().format('DD-MM-YYYY')
                            }).returning({mockId:MockInterview.mockId})
    return resp;
}