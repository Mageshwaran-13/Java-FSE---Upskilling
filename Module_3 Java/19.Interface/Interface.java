interface Playable {
    void play(); 
}


class Guitar implements Playable {
    public void play() {
        System.out.println("Playing a Rock Song in Guitar.");
    }
}

class Piano implements Playable {
    public void play() {
        System.out.println("Playing the Melody Song in Piano.");
    }
}


public class Interface {
    public static void main(String[] args) {

        Playable G = new Guitar();
        Playable P = new Piano();

 
        G.play();
        P.play();
    }
}
