//package com.ricesnack.GrowIT_BE.config;
//
//import org.apache.hadoop.fs.FileSystem;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.io.IOException;
//import java.net.URI;
//
//@Configuration
//public class HadoopConfiguration {
//
//    @Value("${hadoop.uri}")
//    private String hadoopUri;
//
//    @Bean
//    public FileSystem fileSystem() throws IOException {
//        org.apache.hadoop.conf.Configuration conf = new org.apache.hadoop.conf.Configuration();
//        return FileSystem.get(URI.create(hadoopUri), conf);
//    }
//}
