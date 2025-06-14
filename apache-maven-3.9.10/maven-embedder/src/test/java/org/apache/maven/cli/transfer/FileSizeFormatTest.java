/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.maven.cli.transfer;

import java.util.Locale;

import org.apache.maven.cli.transfer.AbstractMavenTransferListener.FileSizeFormat;
import org.apache.maven.cli.transfer.AbstractMavenTransferListener.FileSizeFormat.ScaleUnit;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

@SuppressWarnings("checkstyle:LocalVariableName")
public class FileSizeFormatTest {

    @Test(expected = IllegalArgumentException.class)
    public void testNegativeSize() {
        FileSizeFormat format = new FileSizeFormat(Locale.ENGLISH);

        long negativeSize = -100L;
        format.format(negativeSize);
    }

    @Test
    public void testSize() {
        FileSizeFormat format = new FileSizeFormat(Locale.ENGLISH);

        long _0_bytes = 0L;
        assertEquals("0 B", format.format(_0_bytes));

        long _5_bytes = 5L;
        assertEquals("5 B", format.format(_5_bytes));

        long _10_bytes = 10L;
        assertEquals("10 B", format.format(_10_bytes));

        long _15_bytes = 15L;
        assertEquals("15 B", format.format(_15_bytes));

        long _999_bytes = 999L;
        assertEquals("999 B", format.format(_999_bytes));

        long _1000_bytes = 1000L;
        assertEquals("1.0 kB", format.format(_1000_bytes));

        long _5500_bytes = 5500L;
        assertEquals("5.5 kB", format.format(_5500_bytes));

        long _10_kilobytes = 10L * 1000L;
        assertEquals("10 kB", format.format(_10_kilobytes));

        long _15_kilobytes = 15L * 1000L;
        assertEquals("15 kB", format.format(_15_kilobytes));

        long _999_kilobytes = 999L * 1000L;
        assertEquals("999 kB", format.format(_999_kilobytes));

        long _1000_kilobytes = 1000L * 1000L;
        assertEquals("1.0 MB", format.format(_1000_kilobytes));

        long _5500_kilobytes = 5500L * 1000L;
        assertEquals("5.5 MB", format.format(_5500_kilobytes));

        long _10_megabytes = 10L * 1000L * 1000L;
        assertEquals("10 MB", format.format(_10_megabytes));

        long _15_megabytes = 15L * 1000L * 1000L;
        assertEquals("15 MB", format.format(_15_megabytes));

        long _999_megabytes = 999L * 1000L * 1000L;
        assertEquals("999 MB", format.format(_999_megabytes));

        long _1000_megabytes = 1000L * 1000L * 1000L;
        assertEquals("1.0 GB", format.format(_1000_megabytes));

        long _5500_megabytes = 5500L * 1000L * 1000L;
        assertEquals("5.5 GB", format.format(_5500_megabytes));

        long _10_gigabytes = 10L * 1000L * 1000L * 1000L;
        assertEquals("10 GB", format.format(_10_gigabytes));

        long _15_gigabytes = 15L * 1000L * 1000L * 1000L;
        assertEquals("15 GB", format.format(_15_gigabytes));

        long _1000_gigabytes = 1000L * 1000L * 1000L * 1000L;
        assertEquals("1000 GB", format.format(_1000_gigabytes));
    }

    @Test
    public void testSizeWithSelectedScaleUnit() {
        FileSizeFormat format = new FileSizeFormat(Locale.ENGLISH);

        long _0_bytes = 0L;
        assertEquals("0 B", format.format(_0_bytes));
        assertEquals("0 B", format.format(_0_bytes, ScaleUnit.BYTE));
        assertEquals("0 kB", format.format(_0_bytes, ScaleUnit.KILOBYTE));
        assertEquals("0 MB", format.format(_0_bytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_0_bytes, ScaleUnit.GIGABYTE));

        long _5_bytes = 5L;
        assertEquals("5 B", format.format(_5_bytes));
        assertEquals("5 B", format.format(_5_bytes, ScaleUnit.BYTE));
        assertEquals("0 kB", format.format(_5_bytes, ScaleUnit.KILOBYTE));
        assertEquals("0 MB", format.format(_5_bytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_5_bytes, ScaleUnit.GIGABYTE));

        long _49_bytes = 49L;
        assertEquals("49 B", format.format(_49_bytes));
        assertEquals("49 B", format.format(_49_bytes, ScaleUnit.BYTE));
        assertEquals("0 kB", format.format(_49_bytes, ScaleUnit.KILOBYTE));
        assertEquals("0 MB", format.format(_49_bytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_49_bytes, ScaleUnit.GIGABYTE));

        long _50_bytes = 50L;
        assertEquals("50 B", format.format(_50_bytes));
        assertEquals("50 B", format.format(_50_bytes, ScaleUnit.BYTE));
        assertEquals("0.1 kB", format.format(_50_bytes, ScaleUnit.KILOBYTE));
        assertEquals("0 MB", format.format(_50_bytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_50_bytes, ScaleUnit.GIGABYTE));

        long _999_bytes = 999L;
        assertEquals("999 B", format.format(_999_bytes));
        assertEquals("999 B", format.format(_999_bytes, ScaleUnit.BYTE));
        assertEquals("1.0 kB", format.format(_999_bytes, ScaleUnit.KILOBYTE));
        assertEquals("0 MB", format.format(_999_bytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_999_bytes, ScaleUnit.GIGABYTE));

        long _1000_bytes = 1000L;
        assertEquals("1.0 kB", format.format(_1000_bytes));
        assertEquals("1000 B", format.format(_1000_bytes, ScaleUnit.BYTE));
        assertEquals("1.0 kB", format.format(_1000_bytes, ScaleUnit.KILOBYTE));
        assertEquals("0 MB", format.format(_1000_bytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_1000_bytes, ScaleUnit.GIGABYTE));

        long _49_kilobytes = 49L * 1000L;
        assertEquals("49 kB", format.format(_49_kilobytes));
        assertEquals("49000 B", format.format(_49_kilobytes, ScaleUnit.BYTE));
        assertEquals("49 kB", format.format(_49_kilobytes, ScaleUnit.KILOBYTE));
        assertEquals("0 MB", format.format(_49_kilobytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_49_kilobytes, ScaleUnit.GIGABYTE));

        long _50_kilobytes = 50L * 1000L;
        assertEquals("50 kB", format.format(_50_kilobytes));
        assertEquals("50000 B", format.format(_50_kilobytes, ScaleUnit.BYTE));
        assertEquals("50 kB", format.format(_50_kilobytes, ScaleUnit.KILOBYTE));
        assertEquals("0.1 MB", format.format(_50_kilobytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_50_kilobytes, ScaleUnit.GIGABYTE));

        long _999_kilobytes = 999L * 1000L;
        assertEquals("999 kB", format.format(_999_kilobytes));
        assertEquals("999000 B", format.format(_999_kilobytes, ScaleUnit.BYTE));
        assertEquals("999 kB", format.format(_999_kilobytes, ScaleUnit.KILOBYTE));
        assertEquals("1.0 MB", format.format(_999_kilobytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_999_kilobytes, ScaleUnit.GIGABYTE));

        long _1000_kilobytes = 1000L * 1000L;
        assertEquals("1.0 MB", format.format(_1000_kilobytes));
        assertEquals("1000000 B", format.format(_1000_kilobytes, ScaleUnit.BYTE));
        assertEquals("1000 kB", format.format(_1000_kilobytes, ScaleUnit.KILOBYTE));
        assertEquals("1.0 MB", format.format(_1000_kilobytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_1000_kilobytes, ScaleUnit.GIGABYTE));

        long _49_megabytes = 49L * 1000L * 1000L;
        assertEquals("49 MB", format.format(_49_megabytes));
        assertEquals("49000000 B", format.format(_49_megabytes, ScaleUnit.BYTE));
        assertEquals("49000 kB", format.format(_49_megabytes, ScaleUnit.KILOBYTE));
        assertEquals("49 MB", format.format(_49_megabytes, ScaleUnit.MEGABYTE));
        assertEquals("0 GB", format.format(_49_megabytes, ScaleUnit.GIGABYTE));

        long _50_megabytes = 50L * 1000L * 1000L;
        assertEquals("50 MB", format.format(_50_megabytes));
        assertEquals("50000000 B", format.format(_50_megabytes, ScaleUnit.BYTE));
        assertEquals("50000 kB", format.format(_50_megabytes, ScaleUnit.KILOBYTE));
        assertEquals("50 MB", format.format(_50_megabytes, ScaleUnit.MEGABYTE));
        assertEquals("0.1 GB", format.format(_50_megabytes, ScaleUnit.GIGABYTE));

        long _999_megabytes = 999L * 1000L * 1000L;
        assertEquals("999 MB", format.format(_999_megabytes));
        assertEquals("999000000 B", format.format(_999_megabytes, ScaleUnit.BYTE));
        assertEquals("999000 kB", format.format(_999_megabytes, ScaleUnit.KILOBYTE));
        assertEquals("999 MB", format.format(_999_megabytes, ScaleUnit.MEGABYTE));
        assertEquals("1.0 GB", format.format(_999_megabytes, ScaleUnit.GIGABYTE));

        long _1000_megabytes = 1000L * 1000L * 1000L;
        assertEquals("1.0 GB", format.format(_1000_megabytes));
        assertEquals("1000000000 B", format.format(_1000_megabytes, ScaleUnit.BYTE));
        assertEquals("1000000 kB", format.format(_1000_megabytes, ScaleUnit.KILOBYTE));
        assertEquals("1000 MB", format.format(_1000_megabytes, ScaleUnit.MEGABYTE));
        assertEquals("1.0 GB", format.format(_1000_megabytes, ScaleUnit.GIGABYTE));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNegativeProgressedSize() {
        FileSizeFormat format = new FileSizeFormat(Locale.ENGLISH);

        long negativeProgressedSize = -100L;
        format.formatProgress(negativeProgressedSize, 10L);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNegativeProgressedSizeBiggerThanSize() {
        FileSizeFormat format = new FileSizeFormat(Locale.ENGLISH);

        format.formatProgress(100L, 10L);
    }

    @Test
    public void testProgressedSizeWithoutSize() {
        FileSizeFormat format = new FileSizeFormat(Locale.ENGLISH);

        long _0_bytes = 0L;
        assertEquals("0 B", format.formatProgress(_0_bytes, -1L));

        long _1000_bytes = 1000L;
        assertEquals("1.0 kB", format.formatProgress(_1000_bytes, -1L));

        long _1000_kilobytes = 1000L * 1000L;
        assertEquals("1.0 MB", format.formatProgress(_1000_kilobytes, -1L));

        long _1000_megabytes = 1000L * 1000L * 1000L;
        assertEquals("1.0 GB", format.formatProgress(_1000_megabytes, -1L));
    }

    @Test
    public void testProgressedBothZero() {
        FileSizeFormat format = new FileSizeFormat(Locale.ENGLISH);

        long _0_bytes = 0L;
        assertEquals("0 B", format.formatProgress(_0_bytes, _0_bytes));
    }

    @Test
    public void testProgressedSizeWithSize() {
        FileSizeFormat format = new FileSizeFormat(Locale.ENGLISH);

        long _0_bytes = 0L;
        long _400_bytes = 400L;
        long _800_bytes = 2L * _400_bytes;
        assertEquals("0/800 B", format.formatProgress(_0_bytes, _800_bytes));
        assertEquals("400/800 B", format.formatProgress(_400_bytes, _800_bytes));
        assertEquals("800 B", format.formatProgress(_800_bytes, _800_bytes));

        long _4000_bytes = 4000L;
        long _8000_bytes = 2L * _4000_bytes;
        long _50_kilobytes = 50000L;
        assertEquals("0/8.0 kB", format.formatProgress(_0_bytes, _8000_bytes));
        assertEquals("0.4/8.0 kB", format.formatProgress(_400_bytes, _8000_bytes));
        assertEquals("4.0/8.0 kB", format.formatProgress(_4000_bytes, _8000_bytes));
        assertEquals("8.0 kB", format.formatProgress(_8000_bytes, _8000_bytes));
        assertEquals("8.0/50 kB", format.formatProgress(_8000_bytes, _50_kilobytes));
        assertEquals("16/50 kB", format.formatProgress(2L * _8000_bytes, _50_kilobytes));
        assertEquals("50 kB", format.formatProgress(_50_kilobytes, _50_kilobytes));

        long _500_kilobytes = 500000L;
        long _1000_kilobytes = 2L * _500_kilobytes;

        long _5000_kilobytes = 5L * _1000_kilobytes;
        long _15_megabytes = 3L * _5000_kilobytes;
        assertEquals("0/5.0 MB", format.formatProgress(_0_bytes, _5000_kilobytes));
        assertEquals("0.5/5.0 MB", format.formatProgress(_500_kilobytes, _5000_kilobytes));
        assertEquals("1.0/5.0 MB", format.formatProgress(_1000_kilobytes, _5000_kilobytes));
        assertEquals("5.0 MB", format.formatProgress(_5000_kilobytes, _5000_kilobytes));
        assertEquals("5.0/15 MB", format.formatProgress(_5000_kilobytes, _15_megabytes));
        assertEquals("15 MB", format.formatProgress(_15_megabytes, _15_megabytes));

        long _500_megabytes = 500000000L;
        long _1000_megabytes = 2L * _500_megabytes;
        long _5000_megabytes = 5L * _1000_megabytes;
        long _15_gigabytes = 3L * _5000_megabytes;
        assertEquals("0/500 MB", format.formatProgress(_0_bytes, _500_megabytes));
        assertEquals("1.0/5.0 GB", format.formatProgress(_1000_megabytes, _5000_megabytes));
        assertEquals("5.0 GB", format.formatProgress(_5000_megabytes, _5000_megabytes));
        assertEquals("5.0/15 GB", format.formatProgress(_5000_megabytes, _15_gigabytes));
        assertEquals("15 GB", format.formatProgress(_15_gigabytes, _15_gigabytes));
    }
}
