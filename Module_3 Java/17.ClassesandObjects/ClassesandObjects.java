class Car{
    String make;
    String model;
    int year;

    public void displaydetails(){
        System.out.println("Car Make:"+make);
        System.out.println("Car Model:"+model);
        System.out.println("Year of Manufacture:"+year);
    }
}

public class ClassesandObjects{
    public static void main(String[] args){
        Car car1 = new Car();
        car1.make="Honda";
        car1.model="Civic";
        car1.year=2020;

        Car car2 = new Car();
        car2.make="Toyota";
        car2.model="Innova";
        car2.year=2015;
        
        System.out.println("Details of Car 1:");
        car1.displaydetails();
        System.out.println("Details of Car 2:");
        car2.displaydetails();
    }
    
}