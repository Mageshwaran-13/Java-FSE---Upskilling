import java.util.Scanner;
public class GradeCalculator{
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        System.out.println("Enter mark:");
        float mark = input.nextFloat();

        if(mark>90 && mark<100){
            System.out.println("The Grade is A.");
        }
        else if(mark>80 && mark<89){
            System.out.println("The Grade is B.");            
        }
        else if(mark>70 && mark<79){
            System.out.println("The Grade is C.");
        }
        else if(mark>60 && mark<69){        
            System.out.println("The Grade is D.");
        }
        else if(mark>0 && mark<59){
            System.out.println("The Grade is F.");
        }
        else{
            System.out.println("Invalid! (Please Enter mark between 0-100)");
        }
        input.close();    
    }
}