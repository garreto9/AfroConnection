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
package org.apache.maven.artifact.resolver.filter;

import junit.framework.TestCase;
import org.apache.maven.artifact.Artifact;
import org.apache.maven.artifact.DefaultArtifact;

/**
 * Tests {@link ScopeArtifactFilter}.
 *
 * @author Benjamin Bentmann
 */
public class ScopeArtifactFilterTest extends TestCase {

    private Artifact newArtifact(String scope) {
        return new DefaultArtifact("g", "a", "1.0", scope, "jar", "", null);
    }

    public void testIncludeCompile() {
        ScopeArtifactFilter filter = new ScopeArtifactFilter(Artifact.SCOPE_COMPILE);

        assertTrue(filter.include(newArtifact(Artifact.SCOPE_COMPILE)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_SYSTEM)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_PROVIDED)));
        assertFalse(filter.include(newArtifact(Artifact.SCOPE_RUNTIME)));
        assertFalse(filter.include(newArtifact(Artifact.SCOPE_TEST)));
    }

    public void testIncludeCompilePlusRuntime() {
        ScopeArtifactFilter filter = new ScopeArtifactFilter(Artifact.SCOPE_COMPILE_PLUS_RUNTIME);

        assertTrue(filter.include(newArtifact(Artifact.SCOPE_COMPILE)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_SYSTEM)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_PROVIDED)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_RUNTIME)));
        assertFalse(filter.include(newArtifact(Artifact.SCOPE_TEST)));
    }

    public void testIncludeRuntime() {
        ScopeArtifactFilter filter = new ScopeArtifactFilter(Artifact.SCOPE_RUNTIME);

        assertTrue(filter.include(newArtifact(Artifact.SCOPE_COMPILE)));
        assertFalse(filter.include(newArtifact(Artifact.SCOPE_SYSTEM)));
        assertFalse(filter.include(newArtifact(Artifact.SCOPE_PROVIDED)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_RUNTIME)));
        assertFalse(filter.include(newArtifact(Artifact.SCOPE_TEST)));
    }

    public void testIncludeRuntimePlusSystem() {
        ScopeArtifactFilter filter = new ScopeArtifactFilter(Artifact.SCOPE_RUNTIME_PLUS_SYSTEM);

        assertTrue(filter.include(newArtifact(Artifact.SCOPE_COMPILE)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_SYSTEM)));
        assertFalse(filter.include(newArtifact(Artifact.SCOPE_PROVIDED)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_RUNTIME)));
        assertFalse(filter.include(newArtifact(Artifact.SCOPE_TEST)));
    }

    public void testIncludeTest() {
        ScopeArtifactFilter filter = new ScopeArtifactFilter(Artifact.SCOPE_TEST);

        assertTrue(filter.include(newArtifact(Artifact.SCOPE_COMPILE)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_SYSTEM)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_PROVIDED)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_RUNTIME)));
        assertTrue(filter.include(newArtifact(Artifact.SCOPE_TEST)));
    }
}
