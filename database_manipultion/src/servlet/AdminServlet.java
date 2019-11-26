package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import po.Form;
import po.RoughForm;
import service.AdminService;

/**
 * Servlet implementation class AdminServlet
 */
@WebServlet("/AdminServlet")
public class AdminServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private AdminService adminService = new AdminService();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdminServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    // 管理员登录
    protected void Login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	String stuid = request.getParameter("stuid");
    	String password = request.getParameter("password");
    	int flag = adminService.IfAccount(stuid, password);
    	Gson gson = new Gson();
    	String viewToJson = gson.toJson(flag);
    	
    	//返回请求
    	PrintWriter out = response.getWriter();
    	out.write(viewToJson);
    	out.flush();
    }
    
    // 显示所有申请
    protected void ShowAll(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	ArrayList<RoughForm> list = adminService.ShowAll();
    	Gson gson = new Gson();
    	String viewToJson = gson.toJson(list);

    	//返回请求
    	PrintWriter out = response.getWriter();
    	out.write(viewToJson);
    	out.flush();
    }
    
    // 根据条件显示申请
    protected void ShowInfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	String status = request.getParameter("status");
    	ArrayList<RoughForm> list = adminService.ShowInfo(status);
    	Gson gson = new Gson();
    	String viewToJson = gson.toJson(list);
    	
    	//返回请求
    	PrintWriter out = response.getWriter();
    	out.write(viewToJson);
    	out.flush();
    }
    
    // 显示某个申请的详细信息
    protected void ShowForm(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	String idStr = request.getParameter("formid");
    	int id = Integer.parseInt(idStr);
    	Form form = adminService.ShowForm(id);
    	Gson gson = new Gson();
    	String viewToJson = gson.toJson(form);
    	
    	//返回请求
    	PrintWriter out = response.getWriter();
    	out.write(viewToJson);
    	out.flush();
    }
    
    // 修改申请状态
    protected void ChangeStatus(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	String idStr = request.getParameter("id");
    	int id = Integer.parseInt(idStr);
    	String status = request.getParameter("status");
    	String result = adminService.ChangeStatus(id, status);
    	Gson gson = new Gson();
    	String viewToJson = gson.toJson(result);
    	
    	//返回请求
    	PrintWriter out = response.getWriter();
    	out.write(viewToJson);
    	out.flush();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");          
	    /* 设置响应头允许ajax跨域访问 */  
	    response.setHeader("Access-Control-Allow-Origin", "*");  
	    /* 星号表示所有的异域请求都可以接受， */  
	    response.setHeader("Access-Control-Allow-Methods", "GET,POST");  
		
	    
		String method = request.getParameter("method");
		if("Login".equals(method)){
			Login(request, response);
		} else if("ShowAll".equals(method)){
			ShowAll(request, response);
		} else if ("ShowInfo".equals(method)) {
			ShowInfo(request, response);
		} else if ("ShowForm".equals(method)) {
			ShowForm(request, response);
		} else if ("ChangeStatus".equals(method)){
			ChangeStatus(request, response);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
