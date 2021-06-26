<%@page import="java.util.HashMap"%>
<%@page import="org.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    JSONObject product = (JSONObject) request.getAttribute("product");
    HashMap<String, String> images = (HashMap<String, String>) request.getAttribute("images");
    String pname = product.getString("pname");
    double price = product.getDouble("price");
    int quantity = product.getInt("quantity");
    String shortdescription = product.getString("shortdescription");
    String description = product.getString("description");
    String unit = product.getString("unit");
    String type = product.getString("type");
%>
    <div class="f-desc-container">
        <div class="img-showcase">
            <i class="bx bx-arrow-back"></i>
            <div class="tiny-img">
                <ul>
                    <%
                        for (int i = 1; i <= images.size(); i++) {
                    %>
                    <li><img src="data:image/jpg;charset=utf-8;base64,<%= images.get("" + i)%>" alt="tiny-img" /></li>
                        <%
                            }
                        %>
                </ul>
            </div>
            <div class="big-img">
                <img src="data:image/jpg;charset=utf-8;base64,<%= images.get("1")%>" alt="big-image" />
            </div>
            <div class="cb-btn">
                <button class="atc">Add To Cart</button>
                <button class="qb">Quick Buy</button>
            </div>
        </div>
        <div class="f-desc-div">
            <div class="pname"><%= pname %></div>
            <div class="price">
                <span class="pad">&#8377; <%= price%></span
                ><span class="pbd">&#8377; <%= price%></span>
                <span class="dt-p"> 0% off</span>
            </div>
            <div class="offer">
                <div class="head">Offer</div>
                <div class="body">No offer available</div>
            </div>
            <div class="specification">
                <div class="head">Specification</div>
                <table>
                    <tr>
                        <td>Brand</td>
                        <td><%= pname%></td>
                    </tr>
                    <tr>
                        <td>Packing</td>
                        <td>In the paper bag</td>
                    </tr>
                    <tr>
                        <td>Selling</td>
                        <% if (type.equals("Pack")) {%>
                        <td>Packet wise</td>
                    <tr>
                        <td>Price</td>
                        <td>&#8377;<%= price%> per <%= unit %></td>
                    </tr>
                    </tr>
                    <% } else {%>
                    <td>Weight wise</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>&#8377;<%= price%> per <%= unit %></td>
                    </tr>
                    <% }%>
                    <tr>
                        <td>Discounts</td>
                        <td>Sorry, no discount now</td>
                    </tr>
                </table>
            </div>
            <div class="f-desc">
                <div class="head">Description</div>
                <div class="body">
                    <%= description%>
                </div>
            </div>
        </div>
    </div>