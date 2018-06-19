import { User } from '../../users/interfaces';
import { Message } from '../../messages/interfaces/messages.interface';
import { Community } from '../../communities/interfaces/communities.interface';

export interface Channel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  community?: Community;
	description: string;
	slug: string;
	isPrivate: boolean;
	isDefault: boolean;
	isArchived: boolean;
  author: User;
  type: string;
  messages?: Message[];
  participants: User[];
  pendingUsers: User[];
	blockedUsers: User[];
	moderators: User[];
}