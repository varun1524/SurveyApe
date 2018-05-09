package com.example.surveyape.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class QRCodeUtility {

    private String charSet = "UTF-8";
    private int qrCodeHeight = 200;
    private int qrCodeWidth = 200;

    public BufferedImage createQRCodeImage(String data) throws WriterException, IOException {
        Map<EncodeHintType, ErrorCorrectionLevel> map = new HashMap<>();
        map.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
        BitMatrix bitMatrix = new MultiFormatWriter().encode(
                new String(data.getBytes(charSet), charSet),
                BarcodeFormat.QR_CODE, qrCodeWidth, qrCodeHeight, map);
        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
        return bufferedImage;
    }
}
