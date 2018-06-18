import { aql } from 'arangojs';
import db from './db';

/**
 * @description get all people following a user
 * @param id takes the user id
 * @param next takes pagination value
 * @augments (id: 'user/groop', next: false)
 */
export async function getMyArticles(id: string, next: boolean) {
  const query = aql`
    LET user = DOCUMENT(${id})
    LET connect = (
      FOR v, p, e IN INBOUND user connection
        FILTER p.type == 'follow'
        RETURN v
    )
    FOR u IN connect
        FOR doc IN article
            FILTER doc.author == u._id
            RETURN DISTINCT MERGE(doc, { author: u } )
  `;

  const results = await db.query(query);

  return {
    count: results.count,
    edge: results.next(),
    hasNext: results.hasNext(),
  };
}

/**
 * @description get all people following a user
 * @param id takes the user id
 * @param next takes pagination value
 * @augments (id: 'user/groop', next: false)
 */
export async function getOneArticle(id: string) {
  const query = aql`
    FOR v, p, e IN INBOUND @{id} connection
      FILTER p.type == 'follow'
      RETURN DISTINCT v
  `;

  const results = await db.query(query);

  return {
    count: results.count,
    edge: results.next(),
    hasNext: results.hasNext(),
  };
}

export async function getMyActivity(username: string, skip = 0) {
  const query = aql`
    FOR v, p, e IN INBOUND @{id} article
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

export async function getMyTimeline(id: string, next: boolean) {
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

export async function getMyDrafts(id: string, next: boolean) {
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

export async function getMyPublishedArticles(id: string, next: boolean) {
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

export async function getMySavedArticles(id: string, next: boolean) {
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