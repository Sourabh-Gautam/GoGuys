/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package go.servlet;

import go.dao.LoginRegisterDao;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import go.handler.OtpGenerator;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Sourabh Gautam
 */
public class SmsSenderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter pw = response.getWriter();
        HttpSession session = request.getSession();
        String username = request.getParameter("username");
        String phone = request.getParameter("phone");
        String password = request.getParameter("password");
        try {
            boolean isAvailable = LoginRegisterDao.checkAvailability(phone);
            String otp;
            if (isAvailable) {
                otp = String.valueOf(OtpGenerator.otp(4));
            } else {
                pw.print("This mobile number has already been registered");
                return;
            }
            Twilio.init("ACbbd595d5251d3c2f9f53f62cbf4c7e4f", "ebcda020146a8575c29769e056988dd2");
            Message message = Message.creator(
                    new com.twilio.type.PhoneNumber("+91" + phone),
                    new com.twilio.type.PhoneNumber("+13123139336"),
                    "Your one time password is " + otp)
                    .create();
            pw.print("success");
            session.setAttribute("otp", otp);
            try {
                LoginRegisterDao.addUser(username, password, phone);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        } catch (ApiException api) {
            api.printStackTrace();
            pw.print("Mobile number doesn't exists!");
        } catch (Exception ex) {
            ex.printStackTrace();
            pw.print("error");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
