package po;

/*申请所有信息*/

public class Form {
	int id;
	int userid;
	String name;
	String applydate; // 申请使用时间
	String start;
	String end;
	String phone;
	int number;
	String ifmedia;
	String reason;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getApplydate() {
		return applydate;
	}
	public void setApplydate(String applydate) {
		this.applydate = applydate;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getIfmedia() {
		return ifmedia;
	}
	public void setIfmedia(String ifmedia) {
		this.ifmedia = ifmedia;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	
	@Override
	public String toString() {
		return "Form [id=" + id + ", userid=" + userid + ", name=" + name + ", applydate=" + applydate + ", start="
				+ start + ", end=" + end + ", phone=" + phone + ", number=" + number + ", ifmedia=" + ifmedia
				+ ", reason=" + reason + "]";
	}
	
}
