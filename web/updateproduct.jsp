<%@page import="java.util.Iterator"%>
<%@page import="org.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    JSONObject json = (JSONObject) request.getAttribute("product");
    JSONObject sacJSON = (JSONObject) request.getAttribute("sac");
    JSONObject sJSON = (JSONObject) request.getAttribute("s");
    String[] images = (String[]) request.getAttribute("images");
    Iterator iterator1 = sacJSON.keys();
    Iterator iterator2 = sJSON.keys();
    String[] units = {"kg", "gm", "ltr", "ml", "piece"};
    String[] types = {"open", "pack"};
%>
<div class="product-details">
    <div class="not-description">
        <table>
            <tr><th>ID</th><td><input type="text"  name="id" value="<%= json.get("id")%>" disabled="true"></td></tr>
            <tr><th>Name</th><td><input type="text" class="pname cumu"  name="pname" value="<%= json.get("pname")%>"></td></tr>
            <tr><th>Price</th><td><input type="number" class="price cumu" name="price" value="<%= json.get("price")%>"></td></tr>
            <tr><th>Quantity</th><td><input type="number" class="quantity cumu" name="quantity" value="<%= json.get("quantity")%>"></td></tr>
            <tr><th>Short description</th><td><input type="text" class="short-description cumu" name="short-description" value="<%= json.get("shortdescription")%>"></td></tr>
            <tr><th>Unit</th><td><select name="unit" class="unit">
                    <%
                        for (String unit : units) {
                            if (unit.equals(json.get("unit"))) {
                    %>
                        <option value="<%= unit%>" selected="true"><%= unit%></option>
                        <%
                                continue;
                            }
                        %>
                        <option value="<%= unit%>"><%= unit%></option>
                        <%
                            }
                        %>
                    </select></td></tr>

            <%
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
            %>



            <tr><th>Shop</th><td><select name="shops" class="shops">
                    <%= s%>
                    </select></td></tr>
            <tr><th>Category</th><td><select name="category" class="category">
                    <%= c%>
                    </select></td></tr>
            <tr><th>Type</th><td><select name="type" class="type">
                    <%
                        for (String type : types) {
                            if (type.equals(json.get("type"))) {
                    %>
                        <option value="<%= type%>" selected="true"><%= type%></option>
                        <%
                                continue;
                            }
                        %>
                        <option value="<%= type%>"><%= type%></option>
                        <%
                            }
                        %>
                    </select></td></tr>
        </table>
    </div>
    <div class="description">
        <label>Full Description</label>
        <textarea name="description" class="cumu"><%= json.get("description")%></textarea>
    </div>
</div>
<div class="product-images">
    <div class="all-img-container">
        <%
            for (int i = 1; i <= 5; i++) {
        %>
        <div class="not-img">
            <input type="file" class="img-file img<%= i%>" name="img<%= i%>" accept="image/*">
            <i class='bx bx-plus'></i>
            <%
                if (i <= images.length) {
            %>
            <div class="img-container">
                <i class="bx bxs-trash-alt"></i>

                <img class="base64image" src="data:image/jpg;charset=utf-8;base64,<%= images[i - 1]%>" alt="images">
                </div>
                <%} %>
            
        </div>
        <%
            }
        %>
    </div>
</div>