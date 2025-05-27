public class TypeCasting{
    public static void main(String[] args){
        double Doublevalue = 78.13;
        int Doubletointeger = (int) Doublevalue;

        int Integervalue = 90;
        double Integertodouble = (double) Integervalue;

        System.out.println("Original Double value:"+Doublevalue);
        System.out.println("Double to Integer casting:"+Doubletointeger);
        System.out.println("Original Integer value:"+Integervalue);
        System.out.println("Integer to Double Casting:"+Integertodouble);
    }
}