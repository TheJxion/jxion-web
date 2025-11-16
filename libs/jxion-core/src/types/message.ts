export interface Message {
  id: string;
  user: string;
  message: string;
  createdAt: Date;
}

export interface CreateMessageInput {
  user: string;
  message: string;
}

export interface UpdateMessageInput {
  id: string;
  user?: string;
  message?: string;
}

export interface MessageFilters {
  user?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
