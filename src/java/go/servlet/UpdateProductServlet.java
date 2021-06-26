/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package go.servlet;

import go.dao.ManageProductDao;
import go.dao.ManageShopDao;
import go.handler.ImageHandler;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.json.JSONObject;

/**
 *
 * @author Sourabh Gautam
 */
public class UpdateProductServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter pw = response.getWriter();
        String product = request.getParameter("product");
        String id = request.getParameter("id");
        System.out.println(product);
        String PATH = request.getServletContext().getRealPath("/");
        if (product != null) {
            System.out.println("If run");
            RequestDispatcher rd = request.getRequestDispatcher("updateproduct.jsp");
            try {
                JSONObject json = ManageProductDao.getProduct(product);
                System.out.println(json);
                JSONObject sacJSON = ManageShopDao.getShopsAndCategories();
                JSONObject sJSON = ManageShopDao.getShops();
                if (json != null) {
                    ImageHandler ih = new ImageHandler();
                    String directoryName = PATH.concat("images\\product\\" + product);
                    File file1 = new File(directoryName);
                    String[] images = new String[file1.list().length];
                    for (int i = 1; i <= images.length; i++) {
                        File file2 = new File(directoryName + "\\" + i + ".jpg");
                        images[i - 1] = ih.base64Encode(file2);
                    }
                    request.setAttribute("product", json);
                    request.setAttribute("sac", sacJSON);
                    request.setAttribute("s", sJSON);
                    request.setAttribute("images", images);
                    rd.forward(request, response);
                } else {
                    pw.print(json);
                }
            } catch (Exception ex) {
                pw.print("error");
                ex.printStackTrace();
            }
        } else {
            System.out.println("Else run");
            if (id != null) {
                try {
                    JSONObject result = ManageProductDao.removeProduct(Long.parseLong(id));
                    System.out.println(result);
                    if (result != null) {
                        String directoryName = PATH+"images\\product\\"+result.get("pname");
                        FileUtils.deleteDirectory(new File(directoryName));
                        pw.print("success");
                    } else {
                        pw.print("error");
                    }
                } catch (Exception ex) {
                    pw.print("error");
                    ex.printStackTrace();
                }
            } else {
                
            }
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
