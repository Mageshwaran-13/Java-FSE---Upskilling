public class OperatorPrecedence {
    public static void main(String[] args) { 
        int result1 = 10 + 5 * 2;
        System.out.println("Expression 1: 10 + 5 * 2 = " + result1);

        int result2 = (10 + 5) * 2;
        System.out.println("Expression 2: (10 + 5) * 2 = " + result2);

        int result3 = 20 + 6 / 3;
        System.out.println("Expression 3: 20 + 6 / 3 = " + result3);

        int result4 = 15 - 4 % 3;
        System.out.println("Expression 4: 15 - 4 % 3 = " + result4);

    }
}
