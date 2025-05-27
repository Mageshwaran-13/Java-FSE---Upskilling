import java.util.Scanner;
public class MultiplicationTable{
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        System.out.println("Enter a number:");
        int num = input.nextInt();
        System.out.println("Multiplication table for"+num+"is\n");
        for(int i=1;i<11;i++){
            System.out.println(num+"x"+i+"="+num*i);
        }
    }
    }

