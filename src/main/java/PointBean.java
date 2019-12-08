import lombok.Data;


import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import java.util.ArrayList;
import java.util.List;


public class PointBean {

    private Point newPoint = new Point();

    private List<Point> points = new ArrayList<Point>();

    public void setNewPoint(Point newPoint) {
        this.newPoint = newPoint;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }


    public List<Point> getPoints() {
        return points;
    }

    public Point getNewPoint() {
        return newPoint;
    }

    private boolean was_it_hit(double x, double y, double r) {
        return ((Math.pow(y, 2) <= Math.pow(r, 2) - Math.pow(x, 2)) && (x <= 0) && (y >= 0)) ||
                ((x >= 0) && (x <= r) && (y >= -r) && (y <= 0)) ||
                ((y <= -x + r / 2) && (y >= 0) && (x >= 0));
    }

    public void addPoint(){
        newPoint.setHit(was_it_hit(newPoint.getX(), newPoint.getY(), newPoint.getR()));
        points.add(newPoint);
        newPoint = new Point();
    }
}
