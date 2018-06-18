import { aql } from 'arangojs';
import db from './db';

export async function getCommentsByArticle(id: string, next: boolean) {
  const query = aql`
    FOR v, p, e IN INBOUND @{id} connection
      FILTER p.type == 'follow'
      RETURN DISTINCT v
  `;

  const results = await db.query(query);

  const edge = results.next();

  return {
    count: results.count,
    edge,
    hasNext: results.hasNext(),
  };

}

export async function createNewComment(data: object) {
  const query = aql`
    FOR v, p, e IN INBOUND @{id} connection
      FILTER p.type == 'follow'
      RETURN DISTINCT v
  `;

  const results = await db.query(query);

  const edge = results.next();

  return {
    count: results.count,
    edge,
    hasNext: results.hasNext(),
  };

}