
import { aql } from 'arangojs';
import db from './db';

export async function nearbyUsers(lng: number, lat: number, limit: number, documentName: string) {
  const query = aql`
    RETURN NEAR(user, ${lat}, ${lng}, ${limit}, @{documentName})
  `;
  const results = await db.query(query);
  return results.all();
}

export async function userWithInRange(lng: number, lat: number, range: number, limit: number) {
  const query = aql`
    FOR doc IN user
      LET d = DISTANCE(doc.location[0], doc.location[1], ${lat}, ${lng},)
        FILTER d <= ${range}
        SORT d ASC
      RETURN doc
  `;
  const results = await db.query(query);
  return results.all();
}