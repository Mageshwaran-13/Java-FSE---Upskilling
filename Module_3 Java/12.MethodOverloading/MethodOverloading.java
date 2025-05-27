public class MethodOverloading{
    public static int add(int a,int b){
        return a + b;
    }

    public static double add(double a,double b){
        return a + b;
    }

    public static int add(int a,int b,int c){
        return a + b + c;
    }
    public static void main(String[] args){

        int sum1 = add(13,15);
        double sum2 = add(90.16,87.6);
        int sum3 = add(13,13,15);
        System.out.println("Sum from method 1: "+sum1);
        System.out.println("Sum from method 2: "+sum2);
        System.out.println("Sum from method 3: "+sum3);
    }
}
