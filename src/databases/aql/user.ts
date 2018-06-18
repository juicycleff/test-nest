import { aql } from 'arangojs';
import db from './db';

/**
 * @description get all people following a user
 * @param id takes the user id
 * @param next takes pagination value
 * @augments (id: 'user/groop', next: false)
 */
export async function getFollowers(id: string, next: boolean) {
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

export async function getConnections(id: string, next: boolean) {
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

/**
 * @description get all persons a user is following
 * @param id takes the user id
 * @param next takes pagination value
 * @augments (id: 'user/groop', next: false)
 */
export async function getFollowing(id: string, next: boolean) {
  const query = aql`
    FOR v, p, e IN OUTBOUND @{id} connection
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

export async function getUserById(id: string) {
  const query = aql`
    RETURN FIRST (
      FOR doc IN user
          FILTER doc._id == ${id}
          RETURN doc
      )
    `;
  const results = await db.query(query);
  return results.all();
}

/**
 * @description get user by email
 * @param email provide the user email
 */
export async function getUserByEmail(email: string) {
  const query = aql`
    RETURN FIRST (
      FOR doc IN user
          FILTER doc.email == ${email}
          RETURN doc
      )
    `;
  const results = await db.query(query);
  return results.all();
}

/**
 * @description get user by username
 * @param username provide the user username
 */
export async function getUserByUsername(username: string) {
  const query = aql`
    RETURN FIRST (
      FOR doc IN user
          FILTER doc.username == ${username}
          RETURN doc
      )
    `;
  const results = await db.query(query);
  return results.all();
}

export async function followUser(id: string) {
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

export async function unFollowUser(id: string) {
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

export async function connectUser(id: string) {
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

export async function disconnectUser(id: string) {
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

export async function checkIsFollowing(id: string, agains: string) {
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

export async function checkIsConnected(id: string, agains: string) {
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

export async function checkIsFollower(id: string, agains: string) {
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