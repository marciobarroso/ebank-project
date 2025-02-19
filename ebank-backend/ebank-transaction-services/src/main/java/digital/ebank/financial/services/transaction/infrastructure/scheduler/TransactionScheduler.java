package digital.ebank.financial.services.transaction.infrastructure.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import digital.ebank.financial.services.transaction.application.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class TransactionScheduler {

    private final TransactionService transactionService;

    @Scheduled(cron = "${transaction.processing.schedule}") 
    public void processPendingTransactions() {
        log.info("Starting scheduled processing of pending transactions");
        try {
            transactionService.getPendingTransactionsAndCalculateFees();
            log.info("### Completed scheduled processing of pending transactions");
        } catch (Exception e) {
            log.error("### Error processing pending transactions", e);
        }
    }
}