public class Point {

    private double x;
    private double y;
    private double r;
    private double canvas_x;
    private double canvas_y;
    private double canvas_r;
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


    public double getCanvas_x() {
        return canvas_x;
    }

    public void setCanvas_x(double canvas_x) {
        this.canvas_x = canvas_x;
    }

    public double getCanvas_y() {
        return canvas_y;
    }

    public void setCanvas_y(double canvas_y) {
        this.canvas_y = canvas_y;
    }

    public double getCanvas_r() {
        return canvas_r;
    }

    public void setCanvas_r(double canvas_r) {
        this.canvas_r = canvas_r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }
}
