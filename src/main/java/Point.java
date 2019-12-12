import javax.persistence.*;

@Entity
@NamedQuery(name="Employee.getAll", query="SELECT p FROM Point p")
public class Point {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private double id;
    private double x;
    private double y;
    private double r;
    private boolean hit;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }


    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }
}
