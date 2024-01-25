import { ticketsModel } from "../../models/tickets.model.js";

class TicketsManager {
    async createTicket(ticket) {
        const response = await ticketsModel.create(ticket); 
        return response; 
    }
}

export const TicketManager = new TicketsManager();