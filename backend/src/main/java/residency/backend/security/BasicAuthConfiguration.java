package residency.backend.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class BasicAuthConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private MyLogoutSuccessHandler myLogoutSuccessHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("emp1")
                .password(encoder().encode("1234"))
                .roles("USER")
                .and()
                .withUser("emp2")
                .password(encoder().encode("1234"))
                .roles("USER")
                .and()
                .withUser("resp")
                .password(encoder().encode("1234"))
                .roles("ADMIN")
                .and()
                .withUser("resp2")
                .password(encoder().encode("1234"))
                .roles("ADMIN")
        ;

    }

    @Override
    protected void configure(HttpSecurity http)
            throws Exception {

        http.addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class);
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/login","/ws-task/**").authenticated()
                .antMatchers(HttpMethod.GET,"/task").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/task").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/task").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT,"/task").authenticated()
                .antMatchers("/user/**").hasRole("ADMIN")
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS).and()
                .logout()
                .permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .invalidateHttpSession(true).clearAuthentication(true).logoutSuccessHandler(myLogoutSuccessHandler).deleteCookies("JSESSIONID")
                .and()
                .httpBasic();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
