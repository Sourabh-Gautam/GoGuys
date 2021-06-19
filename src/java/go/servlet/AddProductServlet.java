/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package go.servlet;

import go.dao.ManageProductDao;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;

public class AddProductServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        File directory = null;
        PrintWriter pw = response.getWriter();
        long uniqueId = getUniqueId();
        try {
            System.out.println("Request in Add Product Servlet");
            List<FileItem> formData = getFormData(request);
            Map<String, String> map = getFormFields(formData);

            String pname = map.get("pname");
            String PATH = request.getServletContext().getRealPath("/");
            String directoryName = PATH.concat("images/product/" + pname);

            directory = new File(directoryName);
            if (!directory.exists()) {
                boolean result = directory.mkdir();
                if (result) {
                    System.out.println("directory made");
                } else {
                    System.out.println("directory not made");
                }
            } else {
                System.out.println("Directory Already Exist");
                pw.print("warning");
                return;
            }

            boolean b = ManageProductDao.addProduct(map, uniqueId);
            if (!b) {
                FileUtils.deleteDirectory(directory);
                pw.print("error");
                return;
            } else {
                int result = writeImages(formData, directoryName);
                System.out.println(result + " images inserted");
                pw.print("Product added successfully!");
            }
        } catch (IOException io) {
            System.out.println("IOException : " + io.getMessage());
            if (directory.exists()) {
                FileUtils.deleteDirectory(directory);
                System.out.println("Directory Deleted");
            }
            try {
                ManageProductDao.removeProduct(uniqueId);
                System.out.println("Row Deleted");
                pw.print("error");
            } catch (Exception ex) {
                ex.printStackTrace();
                pw.print("error");
                System.out.println("Unable to delete unconditionally added row");
            }
            //Remove the new product details inerted in the database
            //Delete the directory created
        } catch (SQLException sql) {
            //Deleted the directory created
            FileUtils.deleteDirectory(directory);
            pw.print("error");
        } catch (Exception ex) {
            pw.print("error");
            ex.printStackTrace();
        }
    }

    public long getUniqueId() {
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yMMdHms");
        long id = Long.parseLong(sdf.format(d));
        return id;
    }

    public List<FileItem> getFormData(HttpServletRequest request) throws FileUploadException {
        DiskFileItemFactory df = new DiskFileItemFactory();
        ServletFileUpload sfu = new ServletFileUpload(df);
        ServletRequestContext srq = new ServletRequestContext(request);
        List<FileItem> formData = sfu.parseRequest(srq);
        return formData;
    }

    public Map<String, String> getFormFields(List<FileItem> formData) {
        HashMap<String, String> map = new HashMap<>();
        for (FileItem item : formData) {
            if (item.isFormField()) {
                map.put(item.getFieldName(), item.getString());
            }
        }
        return map;
    }

    public int writeImages(List<FileItem> formData, String path) throws IOException {
        InputStream is;
        int count = 1;
        int flag = 0;
        for (FileItem item : formData) {
            if (!item.isFormField() && item.getSize() > 0) {
                is = item.getInputStream();
                File f = new File(path + "/" + count + ".jpg");
                if (f.createNewFile()) {
                    BufferedImage image = ImageIO.read(is);
                    ImageIO.write(image, "jpg", f);
                    System.out.println("File created!");
                    flag++;
                } else {
                    System.out.println("File is already exist!");
                }
                count++;
            }
        }
        
        return flag;
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
