public class ContaPoupanca extends Conta{

        @override
        public void imprimirExtrato(){
            System.out.println("=== EXTRATO CONTA POUPANCA ===");
            super.imprimirInfosComuns();
        }
}