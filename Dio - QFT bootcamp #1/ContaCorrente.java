public class ContaCorrente extends Conta{
    
        @override
        public void imprimirExtrato(){
            System.out.println("=== EXTRATO CONTA CORRENTE ===");
            super.imprimirInfosComuns();
        }
}