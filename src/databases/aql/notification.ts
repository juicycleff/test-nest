import { aql } from 'arangojs';
import db from './db';

/**
 * @description get all people following a user
 * @param id takes the user id
 * @param next takes pagination value
 * @augments (id: 'user/groop', next: false)
 */
export async function getMyNotifications(id: string, next: boolean) {
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

export async function markOneNotificationSeen(id: string) {
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

export async function markAllNotificationsSeen(id: string) {
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

export async function deleteNotification(id: string) {
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