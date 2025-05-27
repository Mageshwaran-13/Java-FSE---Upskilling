import java.util.Scanner;
public class Factorial{
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        System.out.println("Enter a number to calculate Factorial:");
        int num = input.nextInt();
        int fact=1;
        if(num<0){
            System.out.println("Cannot find Factorial for Negative number.");
        }else{
        for(int i=1;i<=num;i++){
            fact = fact*i;
        }
        }
        System.out.println("The Factorial of "+num+" is :"+fact);
        input.close();
    }
    
}