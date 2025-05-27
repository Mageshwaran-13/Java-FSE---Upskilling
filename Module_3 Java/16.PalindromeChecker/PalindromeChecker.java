import java.util.Scanner;
public class PalindromeChecker{
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        System.out.println("Enter String:");
        String original = input.next();
        String reverse;
        reverse = "";
        for(int i=original.length()-1;i>=0;i--){
            reverse+= original.charAt(i);
        }
        if(reverse.equals(original)){
            System.out.println("It is a palindrome.");
        }else{
            System.out.println("It is not a palindrome.");
        }
        input.close();
    }
}