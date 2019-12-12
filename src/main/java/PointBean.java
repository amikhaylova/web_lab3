import lombok.Data;


import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;


public class PointBean {

    private EntityManagerFactory emf;
    private EntityManager em;
    private Point newPoint = new Point();
    private Deque<Point> points = new ArrayDeque<Point>();

    public void setNewPoint(Point newPoint) {
        this.newPoint = newPoint;
    }

    public void setPoints(Deque<Point> points) {
        this.points =  points;
    }


    public Deque<Point> getPoints() {
        return points;
    }

    public Point getNewPoint() {
        return newPoint;
    }

    public PointBean() {
        try {
            emf = Persistence.createEntityManagerFactory("unit");
            em = emf.createEntityManager();
        } catch (Exception e) {
            System.err.println("Initial SessionFactory creation failed. " + e);
        }
        List<Point> initial_points;
        initial_points = getAll();
        for (Point p : initial_points){
            points.addFirst(p);
        }
        System.out.println(points);
    }


    private boolean was_it_hit(double x, double y, double r) {
        return ((Math.pow(y, 2) <= Math.pow(r, 2) - Math.pow(x, 2)) && (x <= 0) && (y >= 0)) ||
                ((x >= 0) && (x <= r) && (y >= -r) && (y <= 0)) ||
                ((y <= -x + r / 2) && (y >= 0) && (x >= 0));
    }

    public void addPoint(){
        newPoint.setHit(was_it_hit(newPoint.getX(), newPoint.getY(), newPoint.getR()));
        try {
            em.getTransaction().begin();
            em.persist(newPoint);
            em.getTransaction().commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        points.addFirst(newPoint);
        newPoint = new Point();
    }

    private List<Point> getAll(){
        return em.createNamedQuery("Employee.getAll").getResultList();
    }

    public void clearHistory(){
        points.clear();
    }
}
