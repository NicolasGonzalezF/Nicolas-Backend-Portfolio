import ticketDAO from "../dao/tickets.dao.js"

const tickets=new ticketDAO();

const createTicket=(ticket_info)=>{
    return tickets.createTicket(ticket_info);
}
export {createTicket};