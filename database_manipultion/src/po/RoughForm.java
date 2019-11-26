package po;

public class RoughForm {
	int formid;
	String name;
	String applydate;
	String status;
	
	public int getFormid() {
		return formid;
	}
	public void setFormid(int formid) {
		this.formid = formid;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return "RoughForm [formid=" + formid + ", name=" + name + ", applydate=" + applydate + ", status=" + status
				+ "]";
	}
	
}
