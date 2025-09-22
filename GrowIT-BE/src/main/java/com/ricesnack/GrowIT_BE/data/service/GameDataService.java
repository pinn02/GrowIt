package com.ricesnack.GrowIT_BE.data.service;

import com.ricesnack.GrowIT_BE.data.domain.ScenarioData;
import com.ricesnack.GrowIT_BE.machinelearning.domain.AnnualData;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.parquet.example.data.Group;
import org.apache.parquet.hadoop.ParquetReader;
import org.apache.parquet.hadoop.example.GroupReadSupport;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class GameDataService {

    private final FileSystem hdfs;

    public GameDataService(FileSystem fileSystem) {
        this.hdfs = fileSystem;
    }

    public ScenarioData loadRandomScenarioByDifficulty(String difficulty) throws Exception {
        Path metaFilePath = new Path("/");
        List<String> candidateIds;
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(hdfs.open(metaFilePath), StandardCharsets.UTF_8))) {
            candidateIds = reader.lines()
                    .skip(1)
                    .map(line -> line.split(","))
                    .filter(parts -> parts.length >= 3 && parts[2].equalsIgnoreCase(difficulty))
                    .map(parts -> parts[0])
                    .collect(Collectors.toList());
        }

        if (candidateIds.isEmpty()) {
            throw new RuntimeException("해당 난이도(" + difficulty + ")의 시나리오를 찾을 수 없습니다.");
        }

        String selectedId = candidateIds.get(new Random().nextInt(candidateIds.size()));
        Path scenarioFilePath = new Path("/path/to/your/scenarios/" + selectedId + ".parquet");

        List<AnnualData> annualDataList = readParquetToAnnualData(scenarioPath);
    }

    private List<AnnualData> readParquetToAnnualData(Path parquetFilePath) throws Exception {
        List<AnnualData> resultList = new ArrayList<>();
        ParquetReader.Builder<Group> builder = ParquetReader
                .builder(new GroupReadSupport(), parquetFilePath)
                .withConf(hdfs.getConf());

        try (ParquetReader<Group> reader = builder.build()) {
            Group group;
            while ((group = reader.read() != null)) {
                AnnualData annualData = new AnnualData();

            }
        }

    }

}
