import java.util.Scanner;
public class StringReversal{
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        System.out.println("Enter String:");
        String original = input.next();
        String reverse ;
        reverse="";
        for(int i=original.length()-1;i>=0;i--){
            reverse += original.charAt(i);
        }
        System.out.println("Reversed String:"+reverse);
        input.close(); 
    }
}