package go.servlet;

import go.dao.ManageProductDao;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

public class GetProductServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JSONObject json = null;
        try {
            json = ManageProductDao.getProducts();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        PrintWriter pw = response.getWriter();
        pw.print(json);

    }
}
