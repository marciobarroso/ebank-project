package digital.ebank.financial.services.rate.infrastructure.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.data.web.SortHandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class EbankRateServicesWebConfig implements WebMvcConfigurer {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        SortHandlerMethodArgumentResolver sortResolver = new SortHandlerMethodArgumentResolver();
        sortResolver.setSortParameter("sort");
        sortResolver.setPropertyDelimiter(",");
        
        PageableHandlerMethodArgumentResolver pageResolver = new PageableHandlerMethodArgumentResolver(sortResolver);
        pageResolver.setPageParameterName("page");
        pageResolver.setSizeParameterName("size");
        pageResolver.setOneIndexedParameters(true);  // Make page numbers start at 1
        pageResolver.setMaxPageSize(100);           // Set maximum page size
        
        argumentResolvers.add(pageResolver);
    }
	
}
