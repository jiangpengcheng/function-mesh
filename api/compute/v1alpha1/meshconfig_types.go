// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// MeshConfigSpec defines the desired state of MeshConfig
// +kubebuilder:validation:Optional
type MeshConfigSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file
	Name string `json:"name,omitempty"`

	// +kubebuilder:validation:Optional
	Env map[string]string `json:"env,omitempty"`
}

// MeshConfigStatus defines the observed state of MeshConfig
type MeshConfigStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}

// +genclient
// +kubebuilder:object:root=true
// +kubebuilder:subresource:status
// +kubebuilder:subresource:scale:specpath=.spec.replicas,statuspath=.status.replicas,selectorpath=.status.selector

// MeshConfig is the Schema of the global configs for all functions, sinks and sources
// +kubebuilder:pruning:PreserveUnknownFields
type MeshConfig struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   MeshConfigSpec   `json:"spec,omitempty"`
	Status MeshConfigStatus `json:"status,omitempty"`
}

// +kubebuilder:object:root=true
// MeshConfigList contains a list of MeshConfig
type MeshConfigList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []MeshConfig `json:"items"`
}

func init() {
	SchemeBuilder.Register(&MeshConfig{}, &MeshConfigList{})
}
