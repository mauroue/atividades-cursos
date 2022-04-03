public class Main {
    public static void main(String[] args) {
        IConta cc = new ContaCorrente();
        IConta cc = new ContaPoupanca();

        cc.imprimirExtrato();
        poupanca.imprimirExtrato();
    }
}