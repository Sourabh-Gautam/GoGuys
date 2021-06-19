package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.Iterator;
import org.json.JSONObject;

public final class updateproduct_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("\n");

    JSONObject json = (JSONObject) request.getAttribute("product");
    JSONObject sacJSON = (JSONObject) request.getAttribute("sac");
    JSONObject sJSON = (JSONObject) request.getAttribute("s");
    String[] images = (String[]) request.getAttribute("images");
    Iterator iterator1 = sacJSON.keys();
    Iterator iterator2 = sJSON.keys();
    String[] units = {"kg", "gm", "ltr", "ml", "piece"};
    String[] types = {"open", "pack"};

      out.write("\n");
      out.write("<div class=\"product-details\">\n");
      out.write("    <div class=\"not-description\">\n");
      out.write("        <table>\n");
      out.write("            <tr><th>ID</th><td><input type=\"text\"  name=\"id\" value=\"");
      out.print( json.get("id"));
      out.write("\" disabled=\"true\"></td></tr>\n");
      out.write("            <tr><th>Name</th><td><input type=\"text\"  name=\"pname\" value=\"");
      out.print( json.get("pname"));
      out.write("\"></td></tr>\n");
      out.write("            <tr><th>Price</th><td><input type=\"number\" class=\"price\" name=\"price\" value=\"");
      out.print( json.get("price"));
      out.write("\"></td></tr>\n");
      out.write("            <tr><th>Quantity</th><td><input type=\"number\" class=\"quantity\" name=\"quantity\" value=\"");
      out.print( json.get("quantity"));
      out.write("\"></td></tr>\n");
      out.write("            <tr><th>Short description</th><td><input type=\"text\" class=\"short-description\" name=\"short-description\" value=\"");
      out.print( json.get("shortdescription"));
      out.write("\"></td></tr>\n");
      out.write("            <tr><th>Unit</th><td><select name=\"unit\" class=\"unit\">\n");
      out.write("                    ");

                        for (String unit : units) {
                            if (unit.equals(json.get("unit"))) {
                    
      out.write("\n");
      out.write("                        <option value=\"");
      out.print( unit);
      out.write("\" selected=\"true\">");
      out.print( unit);
      out.write("</option>\n");
      out.write("                        ");

                                continue;
                            }
                        
      out.write("\n");
      out.write("                        <option value=\"");
      out.print( unit);
      out.write('"');
      out.write('>');
      out.print( unit);
      out.write("</option>\n");
      out.write("                        ");

                            }
                        
      out.write("\n");
      out.write("                    </select></td></tr>\n");
      out.write("\n");
      out.write("            ");

                String ss = null;
                StringBuffer s = new StringBuffer();
                while (iterator2.hasNext()) {
                    String shop = (String) iterator2.next();
                    if (shop.equals(json.get("shop"))) {
                        s.append("<option value = '" + shop + "' selected='true'>" + shop + "</option>");
                        ss = shop;
                        continue;
                    }
                    s.append("<option value = '" + shop + "'>" + shop + "</option>");
                }

                StringBuffer c = new StringBuffer();
                while (iterator1.hasNext()) {
                    String cat = (String) iterator1.next();
                    String pCat = (String) json.get("category");
                    String sc = (String) sacJSON.get(cat);
                    if (ss.equals(sc)) {
                        if (pCat.equals(cat)) {
                            c.append("<option value='" + cat + "' selected = 'true'>" + cat + "</option>");
                            continue;
                        }
                        c.append("<option value='" + cat + "'>" + cat + "</option>");
                    }
                }
            
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("            <tr><th>Shop</th><td><select name=\"shops\" class=\"shops\">\n");
      out.write("                    ");
      out.print( s);
      out.write("\n");
      out.write("                    </select></td></tr>\n");
      out.write("            <tr><th>Category</th><td><select name=\"category\" class=\"category\">\n");
      out.write("                    ");
      out.print( c);
      out.write("\n");
      out.write("                    </select></td></tr>\n");
      out.write("            <tr><th>Type</th><td><select name=\"type\" class=\"type\">\n");
      out.write("                    ");

                        for (String type : types) {
                            if (type.equals(json.get("type"))) {
                    
      out.write("\n");
      out.write("                        <option value=\"");
      out.print( type);
      out.write("\" selected=\"true\">");
      out.print( type);
      out.write("</option>\n");
      out.write("                        ");

                                continue;
                            }
                        
      out.write("\n");
      out.write("                        <option value=\"");
      out.print( type);
      out.write('"');
      out.write('>');
      out.print( type);
      out.write("</option>\n");
      out.write("                        ");

                            }
                        
      out.write("\n");
      out.write("                    </select></td></tr>\n");
      out.write("        </table>\n");
      out.write("    </div>\n");
      out.write("    <div class=\"description\">\n");
      out.write("        <label>Full Description</label>\n");
      out.write("        <textarea name=\"full-description\">");
      out.print( json.get("description"));
      out.write("</textarea>\n");
      out.write("    </div>\n");
      out.write("</div>\n");
      out.write("<div class=\"product-images\">\n");
      out.write("    <div class=\"all-img-container\">\n");
      out.write("        ");

            for (int i = 1; i <= 5; i++) {
        
      out.write("\n");
      out.write("        <div class=\"not-img\">\n");
      out.write("            <input type=\"file\" class=\"img-file img");
      out.print( i);
      out.write("\" name=\"img");
      out.print( i);
      out.write("\" accept=\"image/*\">\n");
      out.write("            <i class='bx bx-plus'></i>\n");
      out.write("            ");

                if (i <= images.length) {
            
      out.write("\n");
      out.write("            <div class=\"img-container\">\n");
      out.write("                <i class=\"bx bxs-trash-alt\"></i>\n");
      out.write("\n");
      out.write("                <img class=\"base64image\" src=\"data:image/jpg;charset=utf-8;base64,");
      out.print( images[i - 1]);
      out.write("\" alt=\"images\">\n");
      out.write("                </div>\n");
      out.write("                ");
} 
      out.write("\n");
      out.write("            \n");
      out.write("        </div>\n");
      out.write("        ");

            }
        
      out.write("\n");
      out.write("    </div>\n");
      out.write("</div>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
