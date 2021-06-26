package go.servlet;

import go.dao.ManageProductDao;
import go.handler.ImageHandler;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

public class GetProductServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        RequestDispatcher rd = request.getRequestDispatcher("productcard.jsp");
        PrintWriter pw = response.getWriter();
        System.out.println("request arrived");
        JSONObject json = null;
        String shopname = request.getParameter("select");
        String category = request.getParameter("selectedCategory");
        String start = request.getParameter("start");
        String end = request.getParameter("end");
        try {
            if (shopname != null && category != null) {
                System.out.println("If run");
                json = ManageProductDao.getProducts(shopname, category, Integer.parseInt(start), Integer.parseInt(end));
                if (json != null) {
                    HashMap<String, String> map = new HashMap<>();
                    ImageHandler ih = new ImageHandler();
                    for (int i = 1; i <= json.length(); i++) {
                        JSONObject myjson = (JSONObject) json.get("" + i);
                        String pname = myjson.getString("pname");
                        String PATH = request.getServletContext().getRealPath("/");
                        String directoryName = PATH.concat("images/product/" + pname + "/1.jpg");
                        File f = new File(directoryName);
                        String image = ih.base64Encode(f);
                        map.put(pname, image);
                    }
                    request.setAttribute("productDetails", json);
                    request.setAttribute("images", map);
                    rd.forward(request, response);
                } else {
                    pw.print("null");
                }

            } else {
                System.out.println("Else run");
                json = ManageProductDao.getProducts();
                pw.print(json);
            }
        } catch (Exception ex) {
            pw.print("error");
            ex.printStackTrace();
        }
    }
}
