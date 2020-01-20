package residency.backend.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Audit")
public class Audit {
    @Id
    private String id;
    private String informationField;
    private String lastValue;
    private String currentValue;
    private Date auditDate;

    protected Audit() {

    }

    public Audit(String informationField, String lastValue, String currentValue, Date auditDate) {
        this.informationField = informationField;
        this.lastValue = lastValue;
        this.currentValue = currentValue;
        this.auditDate = auditDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInformationField() {
        return informationField;
    }

    public void setInformationField(String informationField) {
        this.informationField = informationField;
    }

    public String getLastValue() {
        return lastValue;
    }

    public void setLastValue(String lastValue) {
        this.lastValue = lastValue;
    }

    public String getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(String currentValue) {
        this.currentValue = currentValue;
    }

    public Date getAuditDate() {
        return auditDate;
    }

    public void setAuditDate(Date auditDate) {
        this.auditDate = auditDate;
    }
}
