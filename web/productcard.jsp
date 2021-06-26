<%@page import="java.util.HashMap"%>
<%@page import="org.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    JSONObject productDetails = (JSONObject) request.getAttribute("productDetails");
    HashMap<String, String> images = (HashMap<String, String>) request.getAttribute("images");
    for (int i = 1; i <= productDetails.length(); i++) {
        JSONObject myjson = (JSONObject)productDetails.get("" + i);
        long id = myjson.getLong("id");
        String pname = myjson.getString("pname");
        double price = myjson.getDouble("price");
        int quantity = myjson.getInt("quantity");
        String shortdescription = myjson.getString("shortdescription");
        String unit = myjson.getString("unit");
        String image = images.get(pname);
%>
<div class="card">
    <input type="hidden" value="<%= id %>"/>
    <div class="item-details">
        <span class="price">
           &#8377; <%= price%>
        </span>
        <p class="description"><%= shortdescription%></p>
    </div>
    <div class="qbuy-and-acart">
        <i class='bx bxs-paper-plane qbuy'></i>
        <i class='bx bx-cart acart'></i>
    </div>
    <div class="img-container">
        <img src="data:image/jpg;charset=utf-8;base64,<%= image %>" alt="">
    </div>
    <div class="card-name"><%= pname%> ( <%= quantity%> <%= unit%> )</div>
</div>
<%
    }
%>